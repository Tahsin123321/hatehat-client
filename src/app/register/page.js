import { Suspense } from "react";
import RegisterForm from "@/components/RegisterForm";

export const metadata = { title: "Create account" };

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  );
}
