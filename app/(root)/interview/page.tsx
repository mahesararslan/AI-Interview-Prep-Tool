import Agent from "@/components/Agent";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";

const Page = async () => {
  const user = await getCurrentUser();

  if (!user) redirect("/sign-in");

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <section className="py-20">

      <Agent
        userName={user?.name!}
        userId={user?.id}
        // profileImage={user?.profileURL}
        type="generate"
      />
      </section>
    </div>
  );
};

export default Page;
