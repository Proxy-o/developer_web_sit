import { Badge } from "components/ui/badge";
import { Button } from "components/ui/button";
import { Zap } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { api } from "~/utils/api";

export default function TalentPage() {
  const router = useRouter();
  const { id } = router.query;
  const talentId = id as string;

  const { data: talent } = api.talents.getTalent.useQuery({
    id: talentId,
  });
  return (
    <div className="rounded-md border p-4">
      <div className=" md:flex">
        <div className="flex justify-center">
          <div className="relative mr-6 h-24 w-24">
            <Image
              className="rounded-full object-cover"
              fill
              src={talent?.image || ""}
              alt={talent?.name || "profile"}
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{talent?.name}</h1>
            <h1 className="text">{talent?.address}</h1>
            <div className="flex items-center justify-center">
              <Badge className="bg-non mr-2 border-gray-400 text-gray-400">
                <Zap className="mr2 text-gray-400" size={16} />
                Available now
              </Badge>{" "}
              <h1 className="text-sm font-light">off</h1>
            </div>
          </div>
        </div>
        <div className="mt-7 flex-1  pl-7  md:mt-0 md:flex md:justify-end">
          <Button className="mr-7 rounded-full" variant={"outline"}>
            Contact
          </Button>
          <Button className="rounded-full">Download CV</Button>
        </div>
      </div>
      <div className="flex  p-2">
        <div className="w-1/3">
          <h1>{talent?.email}</h1>
          <h1>{talent?.phone}</h1>
        </div>
        <div className="flex-1  ">
          <h1 className="text-2xl font-bold">{talent?.title || "Developer"}</h1>
          <h1>{talent?.bio || ""}</h1>
        </div>
      </div>
    </div>
  );
}
