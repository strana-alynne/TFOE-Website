import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { CalendarToday } from "@mui/icons-material";
import { urlFor } from "@/sanity/lib/image"; // Import Sanity's image URL builder

type CardProps = {
  imageSrc: any; // Change type to any to accept Sanity image reference
  title: string;
  description: any;
  date: string;
};

const Card_Component: React.FC<CardProps> = ({
  imageSrc,
  title,
  description,
  date,
}) => {
  // Convert Sanity image reference to URL
  const imageUrl = imageSrc ? urlFor(imageSrc).url() : "";

  return (
    <Card className="w-80 h-96 flex flex-col flex-shrink-0">
      <CardHeader className="p-0">
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      </CardHeader>
      <CardContent className="p-4 pb-4 flex-grow flex flex-col">
        <CardDescription className="text-yellow-600 font-bold">
          {title}
        </CardDescription>
        <CardTitle>{description}</CardTitle>
      </CardContent>
      <div className="flex-grow" />

      <CardFooter className="space-x-2">
        <CalendarToday sx={{ color: "grey" }} />
        <p className="text-gray-500">{date}</p>
      </CardFooter>
    </Card>
  );
};

export default Card_Component;
