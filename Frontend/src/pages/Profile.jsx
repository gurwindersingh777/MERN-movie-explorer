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
    <section className="min-h-screen bg-neutral-950 text-gray-100 flex p-10">
      <main className="flex-1 ml-8 bg-neutral-900 rounded-2xl p-10 shadow-lg">
        <div className="flex justify-between">
          <h1 className="text-xl font-semibold mb-8">Profile</h1>
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
        <div className="flex gap-10">
          <div className="flex flex-col items-center justify-center bg-neutral-800 rounded-2xl w-1/2">
            {user?.avatar ? (
              <Avatar className="w-40 h-40 border border-neutral-700">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback>{user.username}</AvatarFallback>
              </Avatar>
            ) : (
              <CircleUser className="text-neutral-500" size={90} />
            )}
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-1/2 flex flex-col gap-4"
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
