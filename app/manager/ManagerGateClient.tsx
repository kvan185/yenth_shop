"use client";

import { useEffect, useState } from "react";
import { getOwnProfile } from "../../lib/profile";
import { supabase } from "../../lib/supabase";
import ManagerLoginClient from "./ManagerLoginClient";
import ManagerPageClient from "./ManagerPageClient";

type ManagerGateClientProps = {
  authConfigured: boolean;
};

export default function ManagerGateClient({ authConfigured }: ManagerGateClientProps) {
  const [isChecking, setIsChecking] = useState(true);
  const [managerUser, setManagerUser] = useState("");

  useEffect(() => {
    if (!supabase) {
      setIsChecking(false);
      return;
    }

    let isMounted = true;

    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) {
        if (isMounted) {
          setIsChecking(false);
        }
        return;
      }

      const profile = await getOwnProfile(data.user);

      if (isMounted) {
        if (profile?.role === "manager") {
          setManagerUser(profile.username || data.user.email || "manager");
        }
        setIsChecking(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  if (isChecking) {
    return (
      <main className="managerPage managerLoginPage">
        <section className="managerLoginCard">
          <p className="homeEyebrow">Manager</p>
          <h1>Đang kiểm tra quyền quản lý...</h1>
        </section>
      </main>
    );
  }

  if (managerUser) {
    return <ManagerPageClient managerUser={managerUser} />;
  }

  return <ManagerLoginClient authConfigured={authConfigured} />;
}
