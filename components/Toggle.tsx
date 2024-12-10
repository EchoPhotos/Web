"use client";

import { Switch } from "@headlessui/react";
import { useState } from "react";

export function Toggle({
  onChange,
  enable,
}: {
  enable: boolean;
  onChange: (checked: boolean) => void;
}) {
  const [enabled, setEnabled] = useState(enable);

  return (
    <Switch
      checked={enabled}
      onChange={(checked) => {
        setEnabled(checked);
        onChange(checked);
      }}
      className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-gray-400 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[checked]:bg-green-500 data-[focus]:outline-1 data-[focus]:outline-white"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-7"
      />
    </Switch>
  );
}
