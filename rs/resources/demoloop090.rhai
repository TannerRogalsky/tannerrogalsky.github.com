fn load() {
    let scale = 1.35 / 2.;
    let sphere = CsgCube(1., 1., 1.) ^ CsgSphere(scale, 10, 10);

    let radius = 0.35;
    let extent = 0.5;
    let trick_inset = CsgCylinder(0., 0., 0., 0., 0., extent, radius, 8)
        + CsgCylinder(-extent, 0., 0., extent, 0., 0., radius, 8)
        + CsgCylinder(0., -extent, 0.,0., extent, 0., radius, 8);
    let inset = CsgCylinder(0., 0., -extent, 0., 0., extent, radius, 8)
        + CsgCylinder(-extent, 0., 0., extent, 0., 0., radius, 8)
        + CsgCylinder(0., -extent, 0.,0., extent, 0., radius, 8);

    let trick_shape = sphere - trick_inset;
    let inset = CsgCylinder(0., 0., -extent, 0., 0., extent, radius, 8) + inset;
    let shape = sphere - inset;

    let resources = #{
        shape: Geometry(shape),
        trick_shape: Geometry(trick_shape),
        inset: Geometry(inset),
        shader: Shader(read_file("demoloop090.glsl")),
        noise_texture: NoiseTexture(128, 128, 16, 2, true),
    };

    Loop(720, 720, 3., resources)
}

fn min(x, y) {
    if y < x {
        y
    } else {
        x
    }
}

fn max(x, y) {
    if y > x {
        y
    } else {
        x
    }
}

fn clamp(x, min_val, max_val) {
    min(max(x, min_val), max_val)
}

fn lerp(v0, v1, t) {
  return v0 + t * (v1 - v0);
  // return (1 - t) * v0 + t * v1;
}

fn update(ratio, width, height) {
    let ctx = Context();
    let bg = Color(0.1, 0.1, 0.1, 1.0);
    ctx.clear(bg);

    // let ratio = 0.6;

    let shader = resources.shader;
    shader.send("time", ratio);
    ctx.set_shader(shader);

    let tx = Translation(0., 0., -1.);
    let tx = tx  * Rotation(0., ratio * 360. * 0.5, 0.);
    if ratio > 0.6 {
        ctx.image(resources.trick_shape, resources.noise_texture, tx);
    } else {
        ctx.image(resources.shape, resources.noise_texture, tx);
    }

    let ratio = cubic_in(1.0 - ratio);
    let scale = lerp(0.2, 1., ratio);
    let tx = tx * Rotation(0., ratio * 90., ratio * 90.);
    let tx = tx * Scale(scale, scale, scale);
    ctx.image(resources.inset, resources.noise_texture, tx);

    ctx
}