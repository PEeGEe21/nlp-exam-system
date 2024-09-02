import localFont from "next/font/local";

export const SpaceFont = localFont({
  src: [
    {
      path: "./SpaceGrotesk/SpaceGrotesk-Bold.ttf",
      weight: "700",
    },
    {
      path: "./SpaceGrotesk/SpaceGrotesk-SemiBold.ttf",
      weight: "600",
    },
    {
      path: "./SpaceGrotesk/SpaceGrotesk-Medium.ttf",
      weight: "500",
    },
    {
      path: "./SpaceGrotesk/SpaceGrotesk-Regular.ttf",
      weight: "400",
    },
  ],
  variable: "--font-space",
});

export const MontFont = localFont({
  src: [
    {
      path: "./Montserrat/Montserrat-Bold.ttf",
      weight: "700",
    },
    {
      path: "./Montserrat/Montserrat-SemiBold.ttf",
      weight: "600",
    },
    {
      path: "./Montserrat/Montserrat-Medium.ttf",
      weight: "500",
    },
    {
      path: "./Montserrat/Montserrat-Regular.ttf",
      weight: "400",
    },
  ],
  variable: "--font-mont",
});

export const GeneralSansFont = localFont({
  src: [
    {
      path: "./GeneralSans/GeneralSans-Bold.ttf",
      weight: "700",
    },
    {
      path: "./GeneralSans/GeneralSans-Semibold.ttf",
      weight: "600",
    },
    {
      path: "./GeneralSans/GeneralSans-Medium.ttf",
      weight: "500",
    },
    {
      path: "./GeneralSans/GeneralSans-Regular.ttf",
      weight: "400",
    },
  ],
  variable: "--font-sans",
});
