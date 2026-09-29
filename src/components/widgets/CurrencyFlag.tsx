type CurrencyFlagProps = {
  currency: "IRR" | "USD";
};

export default function CurrencyFlag({ currency }: CurrencyFlagProps) {
    const src = currency === "IRR" ? "/flags/ir.svg" : "/flags/us.svg";
   

    return (
      <>
        <img
          src={src}
          alt={currency === "IRR" ? "ایران" : "آمریکا"}
          className="h-5 w-5 rounded-sm object-cover"
            />
            
      </>
    );
}
