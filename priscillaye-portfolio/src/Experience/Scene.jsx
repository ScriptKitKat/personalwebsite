import React, {Suspense} from 'react';
import { useFrame } from "@react-three/fiber";
import Room from './models/Portfolio_Static';
import RoomTargets from './models/Portfolio_Target';
import RoomSpecial from './models/Portfolio_Special';
import { useThree } from "@react-three/fiber";

const Scene = (camera) => {

    // useFrame(() => {
    //     console.log("Camera zoom:", camera.position);
    //     console.log("Camera rotation:", camera.rotation);
    // });

    return (<>
        <Suspense>
            <Room />
            <RoomTargets />
        </Suspense>
    </>)
};

export default Scene;