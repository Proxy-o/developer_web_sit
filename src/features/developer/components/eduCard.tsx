import { Card } from "components/ui/card";
import { TrashIcon, Edit } from "lucide-react";
import React from "react";
import type { eduForm } from "../types";

export default function EduCard({ eduInfo }: { eduInfo: eduForm }) {
  return (
    <Card className="mt-6 flex items-center justify-center p-2 hover:bg-secondary">
      <div className="flex w-full  ">
        <div className="mr-2  w-full items-center rounded-md border p-4">
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
      <div className="ml-2 flex flex-col items-center justify-center gap-2 hover:cursor-pointer">
        <TrashIcon className="h-6 w-6 text-red-400 hover:rotate-6 hover:text-red-600" />
        <Edit className="h-6 w-6" />
      </div>
    </Card>
  );
}
