interface SerializedCameraMp extends CameraMp {
    setActiveCamera(toggle: boolean);
    setActiveCameraWithInterp(position: Vector3Mp, rotation: Vector3Mp, duration: number, easeLocation: number, easeRotation: number);
}
