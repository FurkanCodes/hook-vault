
import {  SidebarNavItem } from "@/types/types";

export interface DocsConfig {
  sidebarNav: SidebarNavItem[];
}

export const docsConfig: DocsConfig = {
  sidebarNav: [
    {
      title: "State",
      items: [
        {
          title: "useLocalStorage",
          href: "/docs/hooks/use-local-storage",
        },
      
      ],
    },
  
    {
      title: "Performance",
      items: [
        {
            title: "useDebounce",
            href: "/docs/hooks/use-debounce",
          },
          {
              title: "useDebounceCallback",
              href: "/docs/hooks/use-debounce-callback",
            },
      ],
    },
    {
      title: "Form",
      items: [
        {
          title: "useForm",
          href: "/docs/hooks/use-form",
        },
       
      ],
    },
    {
      title: "Layout",
      items: [
     
        {
          title: "useMediaQuery",
          href: "/docs/hooks/use-media-query",
        },
      ],
    },
   
    {
      title: "Data Fetching",
      items: [
        {
          title: "useFetch",
          href: "/docs/hooks/use-fetch",
        },
       
      ],
    },
  ],
};