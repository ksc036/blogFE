"use client";
import { statusToEmoji } from "@/shared/lib/statusToEmoji";
import { useEffect, useState } from "react";

export default function ReviewInstance({ data }: { data: any }) {
  return (
    <div>
      {data
        ?.sort(
          (a: any, b: any) =>
            new Date(a.scheduledDate).getTime() -
            new Date(b.scheduledDate).getTime()
        )
        ?.map((instance: any) => (
          <span key={instance.id} style={{ marginRight: "5px" }}>
            {statusToEmoji(instance.status)}
          </span>
        ))}
    </div>
  );
}
