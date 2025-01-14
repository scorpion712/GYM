import { ReactNode, useMemo } from "react";
import { SvgIcon } from "@mui/material";
import GroupIcon from '@mui/icons-material/Group';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';

import { paths } from "../../../../routes/paths";
import EquipmentGym03Icon from "../../../../assets/gymIcon";

export const useSections = () => {

    return useMemo(() => {
        const sideNavItems = [
            {
                title: "Clientes",
                path: paths.index,
                icon: (
                    <SvgIcon fontSize="small" >
                        <GroupIcon />
                    </SvgIcon>
                ),
            } as Item, 
            {
                title: "Rutinas",
                path: paths.workout.index,
                icon: (
                    <SvgIcon fontSize="small" >
                        <EquipmentGym03Icon color="#fff" />
                    </SvgIcon>
                ),
            } as Item,
            {
                title: "Membresías",
                path: paths.membership.index,
                icon: (
                    <SvgIcon fontSize="small" >
                        <RequestQuoteIcon />
                    </SvgIcon>
                ),
            } as Item,
        ];
        return [
            {
                items: sideNavItems,
            } as SectionItem,
        ];
    }, []);
};

export type SectionItem = {
    items: Item[];
    subheader: string;
}

export type Item = {
    disabled: boolean;
    icon: ReactNode;
    title: string;
    label: string;
    path: string;
    external: boolean;
    items: Item[];
}