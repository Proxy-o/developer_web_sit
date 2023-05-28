import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs";
import type { NextPage } from "next";
import DevForm from "./components/devForm";

const Index: NextPage = () => {
  return (
    <div className="container my-10 ">
      <Tabs defaultValue="Personnel_information">
        <TabsList className="grid w-full grid-cols-2 gap-10">
          <TabsTrigger value="Personnel_information">
            Personnel information
          </TabsTrigger>
          <TabsTrigger value="Pro_info">Professional information</TabsTrigger>
        </TabsList>
        <TabsContent value="Personnel_information">
          <DevForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
