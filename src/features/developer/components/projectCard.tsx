import React from "react";
import type { proForm } from "../types";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "components/ui/tooltip";

export default function ProjectCard({ projectInfo }: { projectInfo: proForm }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Card className="mb-2 mr-2 max-h-[26rem]">
            <CardHeader>
              <div className="relative h-32  overflow-hidden border">
                <Image
                  src="https://assets.asana.biz/transform/d2ffb5c8-a7c2-4e39-8447-f8e2501c5bdc/article-project-planning-project-design-2x"
                  alt="Picture of the author"
                  fill
                  className="h-full w-full object-cover transition-all duration-500 ease-in-out hover:scale-110"
                />
              </div>
              <CardTitle>{projectInfo.title}</CardTitle>
            </CardHeader>
            <CardContent className=" flex flex-col gap-2">
              <CardDescription className="max-h-20 min-h-[2.6rem] overflow-auto   md:hidden">
                {projectInfo.description}
              </CardDescription>
              <div className="relative z-50 -mt-8 h-8 bg-white blur-md" />
              <Button>
                <Link href={projectInfo.demo_link || "#"}>Demo</Link>
              </Button>
              <Button>
                <Link href={projectInfo.code_repo || "#"}>Github</Link>
              </Button>
            </CardContent>
          </Card>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          className="auto -ml-[20rem] max-h-52 max-w-[18rem] overflow-auto sm:ml-0"
        >
          <p>{projectInfo.description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
