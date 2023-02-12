import { useState } from "react";
import { useForm, Resolver } from "react-hook-form";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

type FormValues = {
  email: string;
  password: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.email && values.password ? values : {},
    errors: !values.email
      ? {
          email: {
            type: "required",
            message: "Email is required.",
          },
          password: {
            type: "required",
            message: "Password is required.",
          },
        }
      : {},
  };
};

const SignIn = () => {
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });
  const supabase = useSupabaseClient();
  const router = useRouter();

  const onSubmit = handleSubmit(async (values) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });
    if (error) {
      setInvalidCredentials(true);
    } else {
      router.push("/app/boards/1");
    }
  });
  return (
    <section className="w-full px-8 pt-[200px] pb-48 flex justify-center">
      <form
        className="container mx-auto flex flex-col gap-4 relative"
        onSubmit={onSubmit}
      >
        {invalidCredentials && (
          <p className="text-[#2a2b2a] absolute -top-20 bg-red-50 w-full p-3 border border-red-500">
            Invalid email and password combination.
          </p>
        )}
        <h1 className="text-4xl font-primary font-semibold text-[#2a2b2a]">
          Sign In
        </h1>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="font-primary text-[#2a2b2a]">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="border border-[#2a2b2a] px-4 py-3 w-full"
            {...register("email")}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="font-primary text-[#2a2b2a]">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="border border-[#2a2b2a] px-4 py-3 w-full"
            {...register("password")}
          />
        </div>
        <button
          className="bg-[#2a2b2a] text-white font-primary font-semibold px-4 py-3 w-full"
          type="submit"
        >
          Sign In
        </button>
      </form>
    </section>
  );
};

export default SignIn;
