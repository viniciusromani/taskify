import { Loader2Icon } from "lucide-react";

function PageLoading() {
  return (
    <div className="flex flex-1 justify-center items-center container mx-auto px-4">
      <Loader2Icon className="animate-spin text-primary" />
    </div>
  );
}

export { PageLoading };
