import { Button } from "components/ui/button";
import Image from "next/image";
import React, { useState } from "react";
import { api } from "~/utils/api";

export default function Index() {
  const [skip, setSkip] = useState(0);
  const take = 2;
  const { data: talents, isLoading } = api.talents.getTalents.useQuery({
    skip,
    take,
  });

  const { data: talentCount } = api.talents.talentsCount.useQuery();

  const renderPaginationLinks = () => {
    const links = [];
    for (let i = 0; i <= Math.ceil((talentCount || 0) / take); i++) {
      if (i === 0) continue;
      links.push(
        <Button
          key={i}
          disabled={i === skip / take + 1}
          onClick={() => setSkip((i - 1) * take)}
          className="mr-2"
        >
          {i}
        </Button>
      );
    }

    return links;
  };
  return (
    <div>
      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          talents?.map((talent) => {
            return (
              <div key={talent.id}>
                <div className="my-2 flex items-center  border-b ">
                  <div className="relative  h-20 w-20  ">
                    <Image
                      src={talent.image || ""}
                      alt={talent.name || "profile image"}
                      className="h-32 w-32 rounded-full object-contain"
                      fill
                    />
                  </div>
                  <div className="ml-5 ">
                    <div className="text-xl font-bold">{talent.name}</div>
                    <div className="text-lg">{talent.birthday}</div>
                    <div className=" text-gray-400">{talent.address}</div>
                    <div className="">{talent.bio || "Bio"}</div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      <div>{renderPaginationLinks()}</div>
    </div>
  );
}
