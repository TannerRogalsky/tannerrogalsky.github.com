fn load() {
    let resources = #{
        noise_texture: NoiseTexture(128, 128, 4, 1, true),
        gradient_shader: Shader(read_file("demoloop075.glsl")),
    };

    Loop(720, 720, 3., resources)
}


fn update(ratio, width, height) {
    let ctx = Context();
    ctx.clear(Color(0.0, 0.0, 0.0, 1.0));

    let shader = resources.gradient_shader;
    let noise = resources.noise_texture;

    let bg = Rectangle(0.0, 0.0, width, height);
    let overlay = Box();
    // let overlay = Tetrahedron(1., 2);

    let tx = Translation(0., 0., -1.5);
    let tx = tx * Rotation(0., ratio * 360., 0.);

    shader.send("ratio", ratio);

    ctx.set_shader(shader);
    ctx.image(bg, noise);
    ctx.image(overlay, noise, Color(0., 1., 0., 1.), tx);
    ctx.set_shader();

    ctx
}