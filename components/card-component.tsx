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

type CardProps = {
  imageSrc: string;
  title: string;
  description: string;
  date: string;
};

const Card_Component: React.FC<CardProps> = ({
  imageSrc,
  title,
  description,
  date,
}) => {
  return (
    <>
      <Card className="w-80 h-96 flex flex-col flex-shrink-0">
        <CardHeader className="p-0">
          <img src={imageSrc} className="w-full h-48 object-cover" />
        </CardHeader>
        <CardContent className="p-2 pb-4 flex-grow flex flex-col">
          <CardDescription className="text-yellow-600 font bold">
            {title}
          </CardDescription>
          <CardTitle>{description}</CardTitle>
        </CardContent>
        <div className="flex-grow" />

        <CardFooter className=" space-x-2 border-t">
          <CalendarToday />
          <p>{date}</p>
        </CardFooter>
      </Card>
    </>
  );
};

export default Card_Component;
