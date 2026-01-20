import { Trash2 } from "lucide-react";
import { StudentModelInterface } from "@/types/model/student.model";
import { useQueryClient } from "@tanstack/react-query";
import ApiQueryMutationKeys from "@/consts/ApiQueryMutationKeys";
import StudentService from "@/ApiService/StudentService";
import BlockLoadingIndicator from "./BlockLoadingIndicator";
import toast from "react-hot-toast";
interface JobItemProps {
  student: StudentModelInterface;
  page: number;
}

function StudentItem({ student, page }: JobItemProps) {
  const queryClient = useQueryClient();
  const deleteStudentMutation = StudentService.deleteStudentServiceMutation();

  const refreshCurrentPage = () => {
    queryClient.invalidateQueries({
      queryKey: [
        ...ApiQueryMutationKeys.StudentMutationQueryKeys.getStudentsQueryKeys,
        page,
      ],
    });
  };
  const handleDeleteStudent = () => {
    const isDelete = confirm(
      `Are you sure you want to delete ${student.full_name}`
    );
    if (!isDelete) return;
    deleteStudentMutation.mutate(student.id, {
      onSuccess: (data) => {
        toast.success(data.message || "student deleted");
        refreshCurrentPage();
      },
      onError: (data: any) => {
        toast.error(
          data.response.message || data.message || "error deleting student"
        );
      },
    });
  };
  return (
    <tr
      key={student?.id}
      className='hover:bg-slate-50/50 transition-colors group'
    >
      {deleteStudentMutation.isPending ? <BlockLoadingIndicator /> : null}
      <td className='p-4'>
        <p className='font-bold text-brand-dark'>{student?.full_name}</p>
      </td>
      <td className='p-4 text-sm text-slate-600'>
        <p className='font-bold text-brand-dark'>{student?.email}</p>
      </td>
      <td className='p-4'>
        <p className='font-bold text-brand-dark'>{student?.course_of_study}</p>
      </td>
      <td className='p-4 text-sm text-slate-500'>{student.year_of_study}</td>
      <td className='p-4 text-right'>
        <div className='flex justify-end gap-2'>
          <button
            onClick={handleDeleteStudent}
            className='p-2 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition-colors'
            title='Delete'
          >
            <Trash2 className='w-4 h-4' />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default StudentItem;
