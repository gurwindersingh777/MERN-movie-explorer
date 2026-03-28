import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useCurrentUser, useUpdateProfile } from "@/hooks/useAuth";
import { updateProfileSchema } from "@/schema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleUser, UserRoundPen, X } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function Profile() {
  const { data } = useCurrentUser();
  const user = data?.user;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      fullname: user?.fullname || "",
      username: user?.username || "",
    },
  });

  const watchPassword = watch("currPassword");

  const { mutate, isPending } = useUpdateProfile();

  const [updatePanel, setUpdatePanel] = useState(false);

  function onSubmit(values) {
    const formData = new FormData();

    if (values.fullname) formData.append("fullname", values.fullname);
    if (values.username) formData.append("username", values.username);
    if (values.currPassword)
      formData.append("currPassword", values.currPassword);
    if (values.newPassword) formData.append("newPassword", values.newPassword);
    if (values.avatar?.[0]) formData.append("avatar", values.avatar[0]);

    mutate(formData);
    setUpdatePanel(false);
  }

  return (
    <section className="flex min-h-screen bg-neutral-950 p-10 text-gray-100">
      <main className=" flex-1 rounded-2xl bg-neutral-900 p-10 shadow-lg">
        <div className="flex justify-between">
          <h1 className="mb-8 text-xl font-semibold">Profile</h1>
          <Button onClick={() => setUpdatePanel((prev) => !prev)}>
            {updatePanel ? (
              <X />
            ) : (
              <>
                Update <UserRoundPen />
              </>
            )}
          </Button>
        </div>
        <div className="md:flex md:gap-10 justify-between">
          <div className="hidden w-1/2 flex-col items-center justify-center rounded-2xl bg-neutral-800 md:flex">
            {user?.avatar ? (
              <Avatar className="h-40 w-40 border border-neutral-700">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback>{user.username}</AvatarFallback>
              </Avatar>
            ) : (
              <CircleUser className="text-neutral-500" size={90} />
            )}
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="md:w-1/2 flex flex-col gap-4"
          >
            <Field>
              <FieldLabel>Fullname</FieldLabel>
              {errors.fullname && (
                <FieldError>{errors?.fullname.message}</FieldError>
              )}
              <Input
                disabled={!updatePanel}
                placeholder="Enter fullname"
                {...register("fullname")}
              />
            </Field>

            <Field>
              <FieldLabel>Username</FieldLabel>
              {errors.username && (
                <FieldError>{errors?.username.message}</FieldError>
              )}
              <Input
                disabled={!updatePanel}
                placeholder="Enter username"
                {...register("username")}
              />
            </Field>

            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input disabled value={user?.email} />
            </Field>

            <div className="flex gap-5">
              <Field>
                <FieldLabel>Current Password</FieldLabel>
                {errors.currPassword && (
                  <FieldError>{errors.currPassword.message}</FieldError>
                )}
                <Input
                  disabled={!updatePanel}
                  type="password"
                  placeholder="Enter your current password"
                  {...register("currPassword")}
                />
              </Field>

              <Field>
                <FieldLabel>New Password</FieldLabel>
                {errors.newPassword && (
                  <FieldError>{errors.newPassword.message}</FieldError>
                )}

                <Input
                  disabled={!watchPassword}
                  type="password"
                  placeholder="Enter a new password"
                  {...register("newPassword")}
                />
              </Field>
            </div>

            <Field>
              <FieldLabel>Change Avatar</FieldLabel>
              <Input
                disabled={!updatePanel}
                type="file"
                accept="image/*"
                {...register("avatar")}
              />
              <FieldDescription>Select a Avatar to upload.</FieldDescription>
            </Field>

            <Button disabled={!updatePanel || isPending}>
              {isPending ? <Spinner /> : <>Save Changes</>}
            </Button>
          </form>
        </div>
      </main>
    </section>
  );
}
