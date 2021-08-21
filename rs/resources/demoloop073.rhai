fn load() {
    Loop(720, 720, 3., #{})
}


fn arm_offset(origin, ratio, arm_ratio, segment_ratio, width) {
    let waviness = 14.0; // degrees
    let wave = ((ratio + arm_ratio + segment_ratio) * 360.0).sin();
    let phi = arm_ratio * 360.0 + wave * waviness;
    let offset = Translation(width / 2.0 * segment_ratio, 0.0);
    let scale = Scale(segment_ratio * 0.5 + 0.05);
    // let scale = Scale((1.0 - segment_ratio) * 0.5);
    origin * Rotation(phi) * offset * scale
}

fn update(ratio, width, height) {
    let ctx = Context();
    ctx.clear(Color(0.0, 0.0, 0.0, 0.0));

    let origin = Translation(width / 2.0, height / 2.0);

    let arms = 12;
    let segments = 20;
    for arm in range(0, arms) {
        let arm_ratio = arm.to_float() / arms.to_float();
        for segment in range(1, segments) {
            let prev_segment_ratio = (segment - 1).to_float() / segments.to_float();
            let segment_ratio = segment.to_float() / segments.to_float();

            let t1 = arm_offset(origin, ratio, arm_ratio, prev_segment_ratio, width);
            let t2 = arm_offset(origin, ratio, arm_ratio, segment_ratio, width);

            let o1 = Point(0.0,  30.0);
            let o2 = Point(0.0, -30.0);

            let p1 = t1 * o1;
            let p2 = t1 * o2;
            let p3 = t2 * o1;
            let p4 = t2 * o2;

            ctx.draw([p1, p2, p4, p3]);
        }
    }

    ctx
}