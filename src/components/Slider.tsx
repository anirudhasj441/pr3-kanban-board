import React, { useState } from "react";
import * as Slider from "@radix-ui/react-slider";

interface MySliderProps {
    value: number[];
    max?: number;
    min?: number;
    step?: number;
    disabled?: boolean;
    label?: string;
    onChange?: (value: number[]) => void;
}

const MySlider: React.FC<MySliderProps> = (props: MySliderProps) => {
    const [value, setValue] = useState<number[]>(props.value);

    return (
        <div className="flex gap-3 items-center">
            <div className="labed text-slate-600">{props.label}</div>
            <Slider.Root
                defaultValue={value}
                onValueChange={setValue}
                onValueCommit={props.onChange}
                max={props.max}
                min={props.min}
                step={props.step}
                disabled={props.disabled}
                // value={value}
                className="w-full h-1 flex relative items-center"
            >
                <Slider.Track className="bg-slate-300 h-full w-full flex-grow rounded-md relative">
                    <Slider.Range className="bg-green-500 h-full absolute rounded-md"></Slider.Range>
                </Slider.Track>
                <Slider.Thumb className="rounded-full block w-4 h-4 bg-white shadow-md">
                    {0 < value[0] && 100 > value[0] ? (
                        <div className="absolute top-[100%] left-1/2 text-slate-600 -translate-x-1/2">
                            {value[0]}
                        </div>
                    ) : null}
                </Slider.Thumb>
                <div className="start-num absolute left-0 top-[100%] text-slate-600">
                    {props.min}
                </div>
                <div className="start-num absolute right-0 top-[100%] text-slate-600">
                    {props.max}
                </div>
            </Slider.Root>
        </div>
    );
};

MySlider.defaultProps = {
    max: 100,
    min: 0,
    disabled: false,
    step: 1,
    label: "slider: ",
};

export default MySlider;
