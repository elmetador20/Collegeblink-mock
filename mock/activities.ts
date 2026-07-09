export interface Activity {
  id: string;
  type: "user" | "college" | "course" | "blog" | "payment" | "analytics";
  user: string;
  action: string;
  time: string;
  createdAt: Date;
}

export const mockActivities: Activity[] = [
  {
    id: "act_1",
    type: "college",
    user: "Sharique Ahmad",
    action: "added College 'VIT Vellore'",
    time: "2 mins ago",
    createdAt: new Date(Date.now() - 2 * 60000)
  },
  {
    id: "act_2",
    type: "blog",
    user: "System Admin",
    action: "published Blog 'How to Crack JEE Advanced: Tips from Top Rankers'",
    time: "15 mins ago",
    createdAt: new Date(Date.now() - 15 * 60000)
  },
  {
    id: "act_3",
    type: "course",
    user: "System Admin",
    action: "updated Course 'Computer Science and Engineering' details",
    time: "1 hour ago",
    createdAt: new Date(Date.now() - 60 * 60000)
  },
  {
    id: "act_4",
    type: "user",
    user: "Rahul Sharma",
    action: "registered a new account",
    time: "3 hours ago",
    createdAt: new Date(Date.now() - 3 * 3600000)
  },
  {
    id: "act_5",
    type: "college",
    user: "Sharique Ahmad",
    action: "approved College 'KIET Group of Institutions Ghaziabad'",
    time: "5 hours ago",
    createdAt: new Date(Date.now() - 5 * 3600000)
  },
  {
    id: "act_6",
    type: "blog",
    user: "System Admin",
    action: "published Blog 'Top 10 Engineering Colleges in India for 2025'",
    time: "1 day ago",
    createdAt: new Date(Date.now() - 24 * 3600000)
  },
  {
    id: "act_7",
    type: "user",
    user: "Priya Patel",
    action: "registered a new account",
    time: "2 days ago",
    createdAt: new Date(Date.now() - 48 * 3600000)
  }
];
