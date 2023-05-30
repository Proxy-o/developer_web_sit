import { Card } from "components/ui/card";
import { TrashIcon, Edit } from "lucide-react";
import type { eduForm } from "../types";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

export default function EduCard({ eduInfo }: { eduInfo: eduForm }) {
  const { data } = useSession();
  const { mutate: deleteInfo, isLoading } =
    api.developer.deleteEducation.useMutation();
  const utils = api.useContext();

  const handleDelete = () => {
    deleteInfo(
      { id: eduInfo.id },
      {
        onSuccess: () => {
          utils.developer.getEducation
            .invalidate({ userId: data?.user?.id || "" })
            .catch(console.error);
          toast.success("Education information deleted");
        },
      }
    );
  };
  return (
    <Card
      className={`mt-6 flex items-center justify-center p-2 hover:bg-secondary ${
        isLoading ? "pointer-events-none opacity-50" : ""
      }`}
    >
      <div className="flex w-full">
        <div className="mr-2 w-full items-center rounded-md border p-4">
          <h1>{eduInfo.school}</h1>
        </div>
        <div className="mr-2 w-full items-center space-x-4 rounded-md border p-4">
          <h1>{eduInfo.degree}</h1>
        </div>
        <div className="mr-2 w-full items-center space-x-4 rounded-md border p-4">
          <h1>
            {eduInfo.startYear} - {eduInfo.endYear}
          </h1>
        </div>
      </div>
      <div
        className={`ml-2 flex flex-col items-center justify-center gap-2 ${
          isLoading ? "pointer-events-none" : "hover:cursor-pointer"
        }`}
      >
        <TrashIcon
          className={`h-6 w-6 text-red-400 hover:rotate-6 hover:text-red-600 ${
            isLoading ? "pointer-events-none" : ""
          }`}
          onClick={() => handleDelete()}
        />
        <Edit className={`h-6 w-6 ${isLoading ? "pointer-events-none" : ""}`} />
      </div>
    </Card>
  );
}
