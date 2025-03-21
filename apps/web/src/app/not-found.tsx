import { ErrorPage } from "~/components/ErrorPage";

export default function NotFound() {
  return (
    <div className="w-screen h-screen">
      <ErrorPage
        code={404}
        title="Page Not Found"
        description="Sorry, we couldn’t find the page you’re looking for."
      />
    </div>
  );
}
