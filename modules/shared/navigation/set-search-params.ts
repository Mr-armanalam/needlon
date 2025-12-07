import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useCustomSearchParams = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const setParam = (value: string, navigate: boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sbct", value.replaceAll(" ", "_"));

    router.push(
      navigate ? `${params.toString()}` : `${pathname}?${params.toString()}`
    );
  };

  return { setParam };
};
