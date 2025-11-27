import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { recentActivities } from "@/lib/data";

export function RecentActivity() {
  return (
    <Card className="bg-card/70 backdrop-blur-sm col-span-1">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>
          Latest updates and advisories from the system.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        {recentActivities.map((activity) => (
          <div key={activity.id} className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={activity.user.avatar} data-ai-hint={activity.user.avatarHint} />
                <AvatarFallback>
                  {activity.user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">
                  <span className="font-semibold">{activity.user.name}</span> {activity.action} <span className="text-primary">{activity.target}</span>.
                </p>
                <p className="text-sm text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
