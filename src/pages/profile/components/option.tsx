import { Button } from "@/components/ui/button";
import { OptionType } from "./options";

type OptionProps = {
  option: OptionType,
  selected: boolean,
  onChange: (option: OptionType) => void;
}

const Option = ({ option, selected, onChange }: OptionProps) => {
  return (
    <Button
      variant={"ghost"} 
      size={"sm"}
      onClick={() => onChange(option)}
      className={`p-2 text-sm capitalize  cursor-pointer  ${selected ? " bg-white hover:bg-white rounded-md   shadow-sm " : "text-muted-foreground"}`}
    >
      {option.label}
    </Button>
  );
};

export default Option;
