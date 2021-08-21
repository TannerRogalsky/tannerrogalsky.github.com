fn load() {
    let resources = #{
        canvas: Canvas(720, 720),
        shader: Shader(read_file("demoloop085.glsl")),
        bg_shader: Shader(read_file("demoloop085_bg.glsl")),
        gradient_shader: Shader(read_file("gradient.glsl")),
        orb_shader: Shader(read_file("demoloop085_orb.glsl")),
        sun_gradient: Shader(read_file("demoloop085_gradient.glsl")),
    };

    Loop(720, 720, 3., resources)
}

fn update(ratio, width, height) {
    let ctx = Context();
    let bg = Color(0.1, 0.1, 0.1, 1.0);
    ctx.clear(bg);

    let canvas = resources.canvas;
    let gradient_shader = resources.gradient_shader;

    ctx.set_canvas(canvas);
    ctx.clear(Color(0.2, 0.2, 0.2, 1.0));
    let shape = RegularPolygon(0.0, 0.0, 16, 720.0 / 4.);
    let tx = Translation(720.0 / 2.0, 720.0 / 2.0, 0.);
    // let shape = Rectangle(720. * 0.25, 720. * 0.25, 720 * 0.5, 720. * 0.5);

    {
        const COUNT = 10;
        let r = ((ratio * 360) / COUNT).round() * COUNT;
        let tx = tx * Rotation(0., 0., r);

        ctx.draw(RegularPolygon(0., 0., 5, 720. * (0.05 + 0.4)), Color(0., 0., 0., 1.), tx);
        ctx.draw(RegularPolygon(0., 0., 5, 720. * (0. + 0.4)), Color(0.1, 0.1, 0.1, 1.), tx);
    }

    ctx.set_shader(gradient_shader);
    ctx.draw(shape, Color(0.5, 0.5, 0.5, 1.), tx);
    ctx.set_shader();

    ctx.set_canvas();


    let bg_shader = resources.bg_shader;
    bg_shader.send("ratio", ratio);
    ctx.set_shader(bg_shader);
    ctx.draw(Rectangle(0., 0., width, height * 0.3));


    let p = Plane(5., 5., 30, 30);
    let tx = Translation(0., 0., -2.);
    let tx = tx * Rotation(-65., 0., 0.);

    let main_shader = resources.shader;
    main_shader.send("ratio", ratio);
    ctx.set_shader(main_shader);

    for y in range(0, 4) {
        for x in range(-3, 4) {
            let tx = tx * Translation(x * 5., 5. * y + 1., 0.);
            ctx.image(p, canvas, tx);
        }
    }

    ctx.set_orthographic();

    {
        // let ratio = 0.8;
        let sun = Sphere(720. * 0.05, 20, 20);

        let x = (ratio - 0.1) * 720. * 1.2 * 2.;
        let y = ((ratio + 0.5) * 360.).sin() * 720. * 0.08 + 720. * 0.15;
        let tx1 = Translation(x, y, 0.);
        let ratio = (ratio + 0.5) % 1.0;
        let x = (ratio - 0.1) * 720. * 1.2 * 2.;
        let y = ((ratio + 0.5) * 360.).sin() * 720. * 0.08 + 720. * 0.15;
        let tx2 = Translation(x, y, 0.);

        ctx.set_shader(resources.sun_gradient);
        ctx.draw(RegularPolygon(0., 0., 40, 720. * 0.15 * 0.5), Color(1., 0.3, 0.3, 0.2), tx1);
        ctx.draw(RegularPolygon(0., 0., 40, 720. * 0.15 * 0.5), Color(0.4, 0.4, 0.6, 0.2), tx2);

        let orb_shader = resources.orb_shader;
        orb_shader.send("ratio", ratio);
        ctx.set_shader(orb_shader);

        let rotation = Rotation(0., 360. * ratio, 0.);
        ctx.draw(sun, Color(1., 0.3, 0.3, 1.0), tx1 * rotation);
        ctx.draw(sun, Color(0.4, 0.4, 0.6, 1.0), tx2 * rotation);
    }

    ctx
}