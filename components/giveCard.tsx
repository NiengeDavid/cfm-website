import React from "react";
import Container from "./container";
import Link from "next/link";
import Image from "next/image";

interface AccountInfo {
  bankName: string;
  accountName: string;
  accountNumber: string;
}

interface GiveCardProps {
  description: string[];
  buttonText?: string;
  ngnAccount: AccountInfo;
  domAccount: AccountInfo;
}

export default function GiveCard({ data }: { data: GiveCardProps }) {
  return (
    <div className="w-full py-12">
      <Container>
        <div className="bg-secondary flex flex-col items-center justify-between gap-6 mx-auto md:flex-row">
          {/* Text */}
          <div className="w-full bg-primary flex-col gap-5 rounded-r-lg p-6 lg:pl-16 text-white">
            {data.description.map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
            <div className="mt-4">
              <p className="font-bold text-lg">{data.ngnAccount.accountName}</p>
              <p>{data.ngnAccount.accountNumber}</p>
              <p>{data.ngnAccount.bankName}</p>
            </div>
            <div className="mt-4">
              <p className="font-bold text-lg">{data.domAccount.accountName}</p>
              <p>{data.domAccount.accountNumber}</p>
              <p>Dollar Domiciliary Account</p>
              <p>{data.domAccount.bankName}</p>
            </div>
            {data.buttonText && (
              <Link href={"/partnership"} className="cursor-pointer">
              <button className="px-6 py-2 mt-4 text-primary bg-white cursor-pointer rounded-md hover:bg-gray-200">
                {data.buttonText}
              </button>
              </Link>
            )}
          </div>

          {/* Image */}
          <div className="w-full bg-secondary flex items-center justify-center p-6 rounded-lg">
            <Image
              src="/assets/give.png"
              alt="Give Card Image"
              width={500}
              height={500}
              className="rounded-lg"
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
