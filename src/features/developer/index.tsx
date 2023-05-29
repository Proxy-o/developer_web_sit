import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs";
import type { NextPage } from "next";
import InfoForm from "./components/infoForm";
import EduForm from "./components/eduForm";

const Index: NextPage = () => {
  return (
    <div className=" my-10 drop-shadow-sm">
      <Tabs defaultValue="Personnel_information">
        <TabsList className="grid w-full grid-cols-2 gap-1">
          <TabsTrigger value="Personnel_information">
            Personnel information
          </TabsTrigger>
          <TabsTrigger value="Edu_information">
            Education information
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Personnel_information">
          <InfoForm />
        </TabsContent>
        <TabsContent value="Edu_information">
          <EduForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
