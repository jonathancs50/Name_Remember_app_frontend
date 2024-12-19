// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";

// export function UserDetailsModal({ user, onClose, onUpdate }) {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedUser, setEditedUser] = useState({ ...user });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditedUser((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleUpdate = () => {
//     onUpdate(editedUser);
//     setIsEditing(false);
//   };

//   const handleCancel = () => {
//     setEditedUser({ ...user });
//     setIsEditing(false);
//   };

//   return (
//     <Dialog open={true} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-[550px]">
//         <DialogHeader>
//           <DialogTitle className="text-center">
//             {isEditing ? "Edit User Profile" : "User Profile"}
//           </DialogTitle>
//         </DialogHeader>
//         <div className="flex justify-between items-center">
//           {isEditing ? (
//             <>
//               <Button
//                 onClick={handleUpdate}
//                 className="bg-green-500 hover:bg-green-700"
//               >
//                 Confirm
//               </Button>
//               <Button
//                 onClick={handleCancel}
//                 className="bg-gray-500 hover:bg-gray-700"
//               >
//                 Cancel
//               </Button>
//             </>
//           ) : (
//             <>
//               <Button
//                 onClick={() => setIsEditing(true)}
//                 className="bg-green-500 hover:bg-green-700"
//               >
//                 Update
//               </Button>
//               <Button className="bg-red-600 hover:bg-red-900">Delete</Button>
//             </>
//           )}
//         </div>
//         <ScrollArea className="max-h-[80vh] pr-4">
//           <div className="flex flex-col items-center space-y-4 mt-4">
//             <div className="text-center w-full">
//               {isEditing ? (
//                 <>
//                   <Input
//                     name="firstName"
//                     value={editedUser.firstName}
//                     onChange={handleInputChange}
//                     className="mb-2"
//                   />
//                   <Input
//                     name="lastName"
//                     value={editedUser.lastName}
//                     onChange={handleInputChange}
//                     className="mb-2"
//                   />
//                   <Input
//                     name="pronunciation"
//                     value={editedUser.pronunciation}
//                     onChange={handleInputChange}
//                     className="mb-2"
//                   />
//                 </>
//               ) : (
//                 <>
//                   <h2 className="text-2xl font-semibold">
//                     {editedUser.firstName} {editedUser.lastName}
//                   </h2>
//                   <p className="text-muted-foreground">
//                     ({editedUser.pronunciation})
//                   </p>
//                 </>
//               )}
//               <Badge variant="secondary" className="mt-2">
//                 {editedUser.role}
//               </Badge>
//             </div>
//             <Separator />
//             <div className="w-full">
//               <h3 className="font-semibold mb-2">Professional Information</h3>
//               {isEditing ? (
//                 <>
//                   <Input
//                     name="company"
//                     value={editedUser.company}
//                     onChange={handleInputChange}
//                     className="mb-2"
//                   />
//                   <Input
//                     name="role"
//                     value={editedUser.role}
//                     onChange={handleInputChange}
//                     className="mb-2"
//                   />
//                 </>
//               ) : (
//                 <>
//                   <p>
//                     <strong>Company:</strong> {editedUser.company}
//                   </p>
//                   <p>
//                     <strong>Role:</strong> {editedUser.role}
//                   </p>
//                 </>
//               )}
//             </div>
//             <Separator />
//             <div className="w-full">
//               <h3 className="font-semibold mb-2">Personal Details</h3>
//               {isEditing ? (
//                 <>
//                   <Textarea
//                     name="physicalDescription"
//                     value={editedUser.physicalDescription}
//                     onChange={handleInputChange}
//                     className="mb-2"
//                   />
//                   <Textarea
//                     name="personalNotes"
//                     value={editedUser.personalNotes}
//                     onChange={handleInputChange}
//                     className="mb-2"
//                   />
//                 </>
//               ) : (
//                 <>
//                   <p>
//                     <strong>Physical Description:</strong>{" "}
//                     {editedUser.physicalDescription}
//                   </p>
//                   <p>
//                     <strong>Personal Notes:</strong> {editedUser.personalNotes}
//                   </p>
//                 </>
//               )}
//             </div>
//             <Separator />
//             <div className="w-full">
//               <h3 className="font-semibold mb-2">Interests & Topics</h3>
//               {isEditing ? (
//                 <Input
//                   name="interests"
//                   value={editedUser.interests.join(", ")}
//                   onChange={(e) =>
//                     handleInputChange({
//                       target: {
//                         name: "interests",
//                         value: e.target.value.split(", "),
//                       },
//                     })
//                   }
//                   className="mb-2"
//                 />
//               ) : (
//                 <p>
//                   <strong>Interests:</strong> {editedUser.interests.join(", ")}
//                 </p>
//               )}
//             </div>
//             <Separator />
//             <div className="w-full">
//               <h3 className="font-semibold mb-2">Meeting Context</h3>
//               {isEditing ? (
//                 <Textarea
//                   name="meetingContext"
//                   value={editedUser.meetingContext}
//                   onChange={handleInputChange}
//                   className="mb-2"
//                 />
//               ) : (
//                 <p>{editedUser.meetingContext}</p>
//               )}
//             </div>
//           </div>
//         </ScrollArea>
//       </DialogContent>
//     </Dialog>
//   );
// }
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function UserDetailsModal({ user, onClose, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    onUpdate(editedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser({ ...user });
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  const handleDeleteConfirm = () => {
    onDelete(user.id);
    setShowDeleteConfirmation(false);
    onClose();
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirmation(false);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-center">
            {isEditing ? "Edit User Profile" : "User Profile"}
          </DialogTitle>
        </DialogHeader>
        <div className="flex justify-between items-center">
          {isEditing ? (
            <>
              <Button
                onClick={handleUpdate}
                className="bg-green-500 hover:bg-green-700"
              >
                Confirm
              </Button>
              <Button
                onClick={handleCancel}
                className="bg-gray-500 hover:bg-gray-700"
              >
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => setIsEditing(true)}
                className="bg-green-500 hover:bg-green-700"
              >
                Update
              </Button>
              <Button
                onClick={handleDeleteClick}
                className="bg-red-600 hover:bg-red-900"
              >
                Delete
              </Button>
            </>
          )}
        </div>
        <ScrollArea className="max-h-[80vh] pr-4">
          <div className="flex flex-col items-center space-y-4 mt-4">
            <div className="text-center w-full">
              {isEditing ? (
                <>
                  <Input
                    name="firstName"
                    value={editedUser.firstName}
                    onChange={handleInputChange}
                    className="mb-2"
                  />
                  <Input
                    name="lastName"
                    value={editedUser.lastName}
                    onChange={handleInputChange}
                    className="mb-2"
                  />
                  <Input
                    name="pronunciation"
                    value={editedUser.pronunciation}
                    onChange={handleInputChange}
                    className="mb-2"
                  />
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-semibold">
                    {editedUser.firstName} {editedUser.lastName}
                  </h2>
                  <p className="text-muted-foreground">
                    ({editedUser.pronunciation})
                  </p>
                </>
              )}
              <Badge variant="secondary" className="mt-2">
                {editedUser.role}
              </Badge>
            </div>
            <Separator />
            <div className="w-full">
              <h3 className="font-semibold mb-2">Professional Information</h3>
              {isEditing ? (
                <>
                  <Input
                    name="company"
                    value={editedUser.company}
                    onChange={handleInputChange}
                    className="mb-2"
                  />
                  <Input
                    name="role"
                    value={editedUser.role}
                    onChange={handleInputChange}
                    className="mb-2"
                  />
                </>
              ) : (
                <>
                  <p>
                    <strong>Company:</strong> {editedUser.company}
                  </p>
                  <p>
                    <strong>Role:</strong> {editedUser.role}
                  </p>
                </>
              )}
            </div>
            <Separator />
            <div className="w-full">
              <h3 className="font-semibold mb-2">Personal Details</h3>
              {isEditing ? (
                <>
                  <Textarea
                    name="physicalDescription"
                    value={editedUser.physicalDescription}
                    onChange={handleInputChange}
                    className="mb-2"
                  />
                  <Textarea
                    name="personalNotes"
                    value={editedUser.personalNotes}
                    onChange={handleInputChange}
                    className="mb-2"
                  />
                </>
              ) : (
                <>
                  <p>
                    <strong>Physical Description:</strong>{" "}
                    {editedUser.physicalDescription}
                  </p>
                  <p>
                    <strong>Personal Notes:</strong> {editedUser.personalNotes}
                  </p>
                </>
              )}
            </div>
            <Separator />
            <div className="w-full">
              <h3 className="font-semibold mb-2">Interests & Topics</h3>
              {isEditing ? (
                <Input
                  name="interests"
                  value={editedUser.interests.join(", ")}
                  onChange={(e) =>
                    handleInputChange({
                      target: {
                        name: "interests",
                        value: e.target.value.split(", "),
                      },
                    })
                  }
                  className="mb-2"
                />
              ) : (
                <p>
                  <strong>Interests:</strong> {editedUser.interests.join(", ")}
                </p>
              )}
            </div>
            <Separator />
            <div className="w-full">
              <h3 className="font-semibold mb-2">Meeting Context</h3>
              {isEditing ? (
                <Textarea
                  name="meetingContext"
                  value={editedUser.meetingContext}
                  onChange={handleInputChange}
                  className="mb-2"
                />
              ) : (
                <p>{editedUser.meetingContext}</p>
              )}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>

      {showDeleteConfirmation && (
        <Dialog open={showDeleteConfirmation} onOpenChange={handleDeleteCancel}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
            </DialogHeader>
            <p>Are you sure you would like to delete this user?</p>
            <DialogFooter>
              <Button onClick={handleDeleteCancel} variant="outline">
                Cancel
              </Button>
              <Button
                onClick={handleDeleteConfirm}
                className="bg-red-600 hover:bg-red-900"
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </Dialog>
  );
}
