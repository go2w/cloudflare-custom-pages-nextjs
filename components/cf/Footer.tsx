"use client";

import { Card, CardBody } from "@heroui/card";

export const Footer = () => {
  return (
    <Card className="bg-default-50 rounded-none">
      <CardBody className="py-3">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-default-500 text-sm">
          <div className="flex items-center gap-2">
            <span>IP: ::CLIENT_IP::</span>
            <span className="hidden md:inline">•</span>
            <span>Ray ID: ::RAY_ID::</span>
          </div>
          <div>
            <span>Location: ::GEO::</span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default Footer; 