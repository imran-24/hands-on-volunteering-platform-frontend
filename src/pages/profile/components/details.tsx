import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Details = ({ user }: { user: any }) => {
  return (
    <Card>
      <CardContent className=' grid grid-cols-1 lg:grid-cols-2 gap-4'>
        <div>
          <p>Causes</p>
          <ul>
          {user.causes.map((cause: string, index: number) => (
            <li key={index}>
              <Badge variant={"secondary"}>{cause}</Badge>
            </li>
          ))}
          </ul>
        </div>
        <div>
          <p>Skills</p>
          <ul>
          {user.skills.map((skill: string, index: number) => (
            <li key={index}>
              <Badge variant={"secondary"}>{skill}</Badge>
            </li>
          ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default Details;
