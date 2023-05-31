import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs";
import type { NextPage } from "next";
import InfoForm from "./components/infoForm";
import EduForm from "./components/eduForm";
import EduCard from "./components/eduCard";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import ProForm from "./components/proForm";

const Index: NextPage = () => {
  const { data } = useSession();
  const { data: eduInfos } = api.developer.getEducation.useQuery({
    userId: data?.user?.id || "",
  });

  return (
    <div className=" my-10 drop-shadow-sm">
      <Tabs defaultValue="Personnel_information">
        <TabsList className="h-30  grid w-full grid-cols-1 gap-2 md:grid-cols-3">
          <TabsTrigger value="Personnel_information">
            Personnel information
          </TabsTrigger>
          <TabsTrigger value="Edu_information">
            Education information
          </TabsTrigger>
          <TabsTrigger value="Pro_information">
            Professional information
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Personnel_information">
          <InfoForm />
        </TabsContent>
        <TabsContent value="Edu_information">
          <div className="mb-8">
            <EduForm />
          </div>
          {eduInfos
            ?.slice(0)
            .reverse()
            .map((eduInfo) => (
              <EduCard key={eduInfo.id} eduInfo={eduInfo} />
            ))}
        </TabsContent>
        <TabsContent value="Pro_information">
          <ProForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
