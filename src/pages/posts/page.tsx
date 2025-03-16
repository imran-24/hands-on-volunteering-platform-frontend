import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ProfilePicture from "@/components/profile-picture";
import { useAuth } from "@/context/auth-provider";

import PostList from "./components/posts/post-list";


const CommunityHelpPostsPage = () => {
  const { user } = useAuth();

  return (
    <div className='max-w-5xl w-full min-h-full mx-auto overflow-y-auto'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
        <div className='col-span-2'>
          <PostList />
        </div>
        <div className='h-fit rounde '>
          <Card>
            <CardContent>
              <div className='flex space-x-4'>
                <ProfilePicture profileImage={user.profileImage} />
                <div>
                  <p className='text-sm font-medium capitalize'>{user.name}</p>
                  <Badge variant={"active"}>
                    {user.isOrganization ? "Organization" : "User"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CommunityHelpPostsPage;
