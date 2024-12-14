// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
// } from "@/components/ui/dialog";
// import { Badge } from "@/components/ui/badge";

// export function UserDetailsModal({ user, onClose }) {
//   return (
//     <Dialog open={true} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>{user.name}</DialogTitle>
//           <DialogDescription>{user.role}</DialogDescription>
//         </DialogHeader>
//         <div className="flex flex-col items-center space-y-4 mt-4">

//           <div className="text-center">
//             <p className="text-lg font-semibold">{user.name}</p>
//             <p className="text-muted-foreground">{user.role}</p>
//             <Badge variant="secondary" className="mt-2">
//               {user.experience}
//             </Badge>
//           </div>
//           <div className="w-full pt-4 border-t border-border">
//             <h4 className="font-semibold mb-2">About</h4>
//             <p className="text-sm text-muted-foreground">
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
//               eiusmod tempor incididunt ut labore et dolore magna aliqua.
//             </p>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

export function UserDetailsModal({ user, onClose }) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-center">User Profile</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh] pr-4">
          <div className="flex flex-col items-center space-y-4 mt-4">
            <Avatar className="w-24 h-24">
              <AvatarFallback className="text-4xl">
                {user.firstName[0]}
                {user.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h2 className="text-2xl font-semibold">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-muted-foreground">({user.pronunciation})</p>
              <Badge variant="secondary" className="mt-2">
                {user.role}
              </Badge>
            </div>
            <Separator />
            <div className="w-full">
              <h3 className="font-semibold mb-2">Professional Information</h3>
              <p>
                <strong>Company:</strong> {user.company}
              </p>
              <p>
                <strong>Role:</strong> {user.role}
              </p>
            </div>
            <Separator />
            <div className="w-full">
              <h3 className="font-semibold mb-2">Personal Details</h3>
              <p>
                <strong>Physical Description:</strong>{" "}
                {user.physicalDescription}
              </p>
              <p>
                <strong>Personal Notes:</strong> {user.personalNotes}
              </p>
            </div>
            <Separator />
            <div className="w-full">
              <h3 className="font-semibold mb-2">Interests & Topics</h3>
              <p>
                <strong>Interests:</strong> {user.interests.join(", ")}
              </p>
              {/* <p>
                <strong>Conversation Topics:</strong>{" "}
                {user.conversationTopics.join(", ")}
              </p> */}
            </div>
            <Separator />
            <div className="w-full">
              <h3 className="font-semibold mb-2">Meeting Context</h3>
              <p>{user.meetingContext}</p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
