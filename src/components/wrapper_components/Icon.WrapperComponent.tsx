import React from "react";

import FileDownload from "@mui/icons-material/FileDownload";
import Image from "@mui/icons-material/Image";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LinkIcon from "@mui/icons-material/Link";
import SideBarMenuIcon from "@mui/icons-material/Menu";
import { SvgIcon, SxProps, Theme } from "@mui/material";

interface IconProps {
  type:
    | "image"
    | "fileDownload"
    | "keyboardArrowDown"
    | "androidStudio"
    | "flutter"
    | "reactNative"
    | "swift"
    | "xamarin"
    | "moreVertIcon"
    | "delete"
    | "links"
    | "sideBarMenu";

  style?: SxProps<Theme>;
}

const Icon: React.FC<IconProps> = (props) => {
  if (props.type === "image") {
    return <Image sx={props.style} />;
  }

  if (props.type === "fileDownload") {
    return <FileDownload sx={props.style} />;
  }

  if (props.type === "keyboardArrowDown") {
    return <KeyboardArrowDown sx={props.style} />;
  }

  if (props.type === "sideBarMenu") {
    return <SideBarMenuIcon sx={props.style} />;
  }

  if (props.type === "androidStudio") {
    return (
      <SvgIcon sx={props.style}>
        <path
          d="M9.0625 3.5L9 7.5H2.5C2.5 7.5 2.5 6.2165 2.5 5.25C2.5 4.2835 3.2835 3.5 4.25 3.5C5.2165 3.5 9.0625 3.5 9.0625 3.5Z"
          fill="#37474F"
        />
        <path
          d="M15.0045 2.8135L15.9295 1.255C16.0705 1.0175 15.992 0.710499 15.755 0.569499C15.5175 0.427999 15.211 0.506999 15.0695 0.743999L14.097 2.382C13.4445 2.138 12.739 2 12 2C11.261 2 10.5555 2.138 9.90249 2.3825L8.92999 0.744499C8.78899 0.507499 8.48249 0.428499 8.24449 0.569999C8.00699 0.710999 7.92899 1.018 8.06999 1.2555L8.99499 2.814C7.34449 3.774 6.19099 5.495 6.02499 7.5005H17.975C17.809 5.4945 16.6555 3.7735 15.0045 2.8135Z"
          fill="#00E676"
        />
        <path
          d="M9.5 5.5C9.77614 5.5 10 5.27614 10 5C10 4.72386 9.77614 4.5 9.5 4.5C9.22386 4.5 9 4.72386 9 5C9 5.27614 9.22386 5.5 9.5 5.5Z"
          fill="white"
        />
        <path
          d="M14.5 5.5C14.7761 5.5 15 5.27614 15 5C15 4.72386 14.7761 4.5 14.5 4.5C14.2239 4.5 14 4.72386 14 5C14 5.27614 14.2239 5.5 14.5 5.5Z"
          fill="white"
        />
        <path
          d="M19.75 7C19.503 7 4.68 7 4.25 7C3.2835 7 2.5 6.2165 2.5 5.25C2.5 5.2505 2.5 17.7835 2.5 18.75C2.5 19.7165 3.2835 20.5 4.25 20.5C4.68 20.5 21.5 20.5 21.5 20.5C21.5 20.5 21.5 9.7165 21.5 8.75C21.5 7.7835 20.7165 7 19.75 7Z"
          fill="#448AFF"
        />
        <path
          d="M19.75 10.5C19.579 10.5 19.3145 10.5 19 10.5V23.4375C19.3145 23.4375 19.579 23.4375 19.75 23.4375C20.7165 23.4375 21.5 22.654 21.5 21.6875C21.5 20.721 21.5 8.75 21.5 8.75C21.5 9.7165 20.7165 10.5 19.75 10.5Z"
          fill="#37474F"
        />
        <path
          d="M16.884 22.0305L13.162 14.121C13.6675 13.7575 14 13.1685 14 12.5C14 11.571 13.36 10.7945 12.5 10.571V9.5C12.5 9.224 12.276 9 12 9C11.724 9 11.5 9.224 11.5 9.5V10.571C10.64 10.7945 9.99999 11.571 9.99999 12.5C9.99999 13.1685 10.3325 13.7575 10.838 14.121L7.11799 22.0265C6.90599 22.477 7.01749 23.039 7.42799 23.3205C7.95149 23.6795 8.64648 23.475 8.90498 22.9255L11.2265 17.9925C11.5345 17.338 12.466 17.338 12.774 17.9925L15.0955 22.9255C15.2655 23.288 15.625 23.5 16.0005 23.5C16.206 23.5 16.4165 23.436 16.602 23.299C16.991 23.012 17.09 22.468 16.884 22.0305ZM12 11.5C12.5515 11.5 13 11.9485 13 12.5C13 13.0515 12.5515 13.5 12 13.5C11.4485 13.5 11 13.0515 11 12.5C11 11.9485 11.4485 11.5 12 11.5Z"
          fill="#37474F"
        />
      </SvgIcon>
    );
  }

  if (props.type === "flutter") {
    return (
      <SvgIcon sx={props.style}>
        <path d="M13 2L3 12L6 15L19 2H13Z" fill="#40C4FF" />
        <path d="M19 11L13.5 16.5L10.5 13.5L13 11H19Z" fill="#40C4FF" />
        <path
          d="M10.4996 13.5001L7.49976 16.5001L10.4997 19.4999L13.4996 16.4999L10.4996 13.5001Z"
          fill="#03A9F4"
        />
        <path d="M19 22H13L10.5 19.5L13.5 16.5L19 22Z" fill="#01579B" />
        <path d="M10.5 19.5L15 18L13.5 16.5L10.5 19.5Z" fill="#084994" />
      </SvgIcon>
    );
  }

  if (props.type === "reactNative") {
    return (
      <SvgIcon sx={props.style}>
        <path
          d="M12 17C5.55 17 0.5 14.8 0.5 12C0.5 9.2 5.55 7 12 7C18.45 7 23.5 9.2 23.5 12C23.5 14.8 18.45 17 12 17ZM12 8C5.7 8 1.5 10.05 1.5 12C1.5 13.95 5.7 16 12 16C18.3 16 22.5 13.95 22.5 12C22.5 10.05 18.3 8 12 8Z"
          fill="#80DEEA"
        />
        <path
          d="M7.55001 22.3C7.05001 22.3 6.65001 22.2 6.25001 21.95C3.80001 20.55 4.45001 15.1 7.65001 9.5C9.15001 6.9 11 4.7 12.8 3.3C14.75 1.8 16.5 1.35 17.7 2.05C18.95 2.75 19.4 4.5 19.1 6.95C18.8 9.25 17.8 11.95 16.3 14.55C14.8 17.15 12.95 19.35 11.15 20.75C9.85001 21.75 8.60001 22.3 7.55001 22.3ZM16.45 2.7C15.65 2.7 14.6 3.15 13.45 4.05C11.75 5.4 10 7.5 8.55001 10C5.40001 15.45 5.10001 20.15 6.75001 21.1C7.60001 21.6 9.00001 21.15 10.55 19.95C12.25 18.6 14 16.5 15.45 14C16.9 11.5 17.85 8.95 18.15 6.8C18.4 4.8 18.1 3.4 17.25 2.9C17 2.8 16.75 2.7 16.45 2.7Z"
          fill="#80DEEA"
        />
        <path
          d="M16.5 22.3C14 22.3 10.4 19.25 7.7 14.5C4.45 8.9 3.8 3.45 6.25 2.05C8.7 0.650001 13.1 3.9 16.35 9.5C17.85 12.1 18.85 14.8 19.15 17.1C19.5 19.55 19 21.25 17.75 22C17.35 22.2 16.95 22.3 16.5 22.3ZM6.75 2.9C5.1 3.85 5.4 8.55 8.55 14C11.7 19.45 15.6 22.05 17.25 21.1C18.1 20.6 18.4 19.2 18.15 17.2C17.85 15.05 16.9 12.5 15.45 10C12.3 4.55 8.4 1.95 6.75 2.9Z"
          fill="#80DEEA"
        />
        <path
          d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z"
          fill="#80DEEA"
        />
      </SvgIcon>
    );
  }

  if (props.type === "swift") {
    return (
      <SvgIcon sx={props.style}>
        <path
          d="M3 5C3 3.8955 3.8955 3 5 3H19C20.1045 3 21 3.8955 21 5V19C21 20.104 20.1045 21 19 21H5C3.8955 21 3 20.104 3 19V5Z"
          fill="#FF6D00"
        />
        <path
          d="M3 5V10.9835L5 12.9835C5 12.9835 10.5765 19.424 15 15C19.4235 10.576 13.0095 5.5 13.0095 5.5L10.507 3H5C3.8955 3 3 3.895 3 5Z"
          fill="#E64A19"
        />
        <path
          d="M13.0095 5.5C18.724 9.349 16.8755 13.5935 16.8755 13.5935C16.8755 13.5935 18.5005 15.4105 17.8435 17C17.8435 17 17.1735 15.887 16.0495 15.887C14.9665 15.887 14.3295 17 12.1495 17C7.2955 17 5 12.9835 5 12.9835C9.3735 15.8335 12.3595 13.815 12.3595 13.815C10.389 12.682 6 7 6 7C9.6495 10.0775 11.5 11 11.5 11C10.559 10.229 7.5 6.5 7.5 6.5C9.612 8.619 14.1535 11.689 14.1535 11.689C15.3455 8.417 13.0095 5.5 13.0095 5.5Z"
          fill="white"
        />
      </SvgIcon>
    );
  }

  if (props.type === "xamarin") {
    return (
      <SvgIcon sx={props.style}>
        <path
          d="M16.438 2.5H7.562C6.994 2.5 6.4355 2.8255 6.154 3.325L1.711 11.17C1.4295 11.675 1.4295 12.325 1.711 12.83L6.154 20.675C6.4355 21.175 6.994 21.5 7.562 21.5H16.438C17.006 21.5 17.5645 21.1745 17.846 20.675L22.289 12.83C22.5705 12.325 22.5705 11.675 22.289 11.17L17.846 3.325C17.5645 2.8255 17.006 2.5 16.438 2.5Z"
          fill="#039BE5"
        />
        <path
          d="M16.306 17H14.7805C14.709 17 14.638 16.9555 14.6045 16.8915L12.024 12.099C12.0095 12.074 12.005 12.0445 12 12.02C11.995 12.0445 11.9905 12.0745 11.976 12.099L9.386 16.8915C9.3575 16.9555 9.291 16.995 9.2195 17H7.694C7.556 17 7.4515 16.817 7.523 16.6885L10.0465 12L7.523 7.3015C7.461 7.188 7.537 7.025 7.656 7H9.2195C9.286 7 9.3525 7.0445 9.386 7.104L11.976 11.8965C11.99 11.921 11.995 11.946 12 11.9755C12.005 11.946 12.0095 11.921 12.024 11.8965L14.6045 7.104C14.6425 7.0395 14.709 7 14.7805 7H16.306C16.439 7 16.539 7.178 16.477 7.3015L13.9535 12L16.477 16.6885C16.5485 16.817 16.4435 17 16.306 17Z"
          fill="white"
        />
      </SvgIcon>
    );
  }

  if (props.type === "moreVertIcon") {
    return <MoreVertIcon sx={props.style} />;
  }

  if (props.type === "delete") {
    return <DeleteIcon sx={props.style} />;
  }

  if (props.type === "links") {
    return <LinkIcon sx={props.style} />;
  }

  return null;
};

export default Icon;
