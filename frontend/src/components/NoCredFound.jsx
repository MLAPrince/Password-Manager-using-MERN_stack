import { NotebookIcon } from "lucide-react";
import { Link } from "react-router";

const NoCredFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center">
      <div className="bg-primary/10 rounded-full p-8">
        <NotebookIcon className="size-10  text-lime-700" />
      </div>
      <h3 className="text-2xl font-bold">No Credentials yet</h3>
      <p className="text-base-content/70">
        Ready to organize your Credentials? Create your first Credential to get started on your journey.
      </p>
      <Link to="/create" className="btn text-black bg-lime-600 border-lime-700 shadow-lg hover:shadow-lime-700">
        Create Your First Credential
      </Link>
    </div>
  );
};
export default NoCredFound;

















// import { NotebookIcon } from "lucide-react";
// import { Link } from "react-router";

// const NotesNotFound = () => {
//   return (
//     <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center">
//       <div className="bg-primary/10 rounded-full p-8">
//         <NotebookIcon className="size-10 text-primary" />
//       </div>
//       <h3 className="text-2xl font-bold">No notes yet</h3>
//       <p className="text-base-content/70">
//         Ready to organize your thoughts? Create your first note to get started on your journey.
//       </p>
//       <Link to="/create" className="btn btn-primary">
//         Create Your First Note
//       </Link>
//     </div>
//   );
// };
// export default NotesNotFound;