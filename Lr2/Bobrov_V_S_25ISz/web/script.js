
// begin global

const BACKGROUND = "#101010"
const FOREGROUND = "#ff8800"

const vs = [
    {x:  0.25, y:  0.25, z:  0.25},
    {x: -0.25, y:  0.25, z:  0.25},
    {x: -0.25, y: -0.25, z:  0.25},
    {x:  0.25, y: -0.25, z:  0.25},

    {x:  0.25, y:  0.25, z: -0.25},
    {x: -0.25, y:  0.25, z: -0.25},
    {x: -0.25, y: -0.25, z: -0.25},
    {x:  0.25, y: -0.25, z: -0.25},
]

const fs = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [0, 4],
    [1, 5],
    [2, 6],
    [3, 7],
]

const FPS = 60;

canvas_1.width = 512
canvas_1.height = 512

canvas_2.width = 512
canvas_2.height = 512

canvas_3.width = 512
canvas_3.height = 512

canvas_4.width = 512
canvas_4.height = 512

const ctx_1 = canvas_1.getContext("2d")
const ctx_2 = canvas_2.getContext("2d")
const ctx_3 = canvas_3.getContext("2d")
const ctx_4 = canvas_4.getContext("2d")

// end global

// begin canvas

function clear(ctx, canvas) {
    ctx.fillStyle = BACKGROUND
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

function point(ctx, {x, y}) {
    const s = 2;
    ctx.fillStyle = FOREGROUND
    ctx.fillRect(x - s / 2, y - s / 2, s, s)
}

function line(ctx, p1, p2) {
    ctx.lineWidth = 3;
    ctx.strokeStyle = FOREGROUND
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
}

function screen(canvas, p) {
    return {
        x: (p.x + 1) / 2 * canvas.width,
        y: (1 - (p.y + 1) / 2) * canvas.height,
    }
}

function project({x, y, z}) {
    return {
        x: x / z,
        y: y / z,
    }
}

function translate_z({x, y, z}, dz) {
    return { x, y, z: z + dz };
}

function translate_x({x, y, z}, dx) {
    return { x: x + dx, y, z };
}

function rotate_xz({x, y, z}, angle) {
    const c = Math.cos(angle);
    const s = Math.sin(angle);

    return {
        x: x * c - z * s,
        y,
        z: x * s + z * c,
    };
}

function rotate_xy({x, y, z}, angle) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);

  return {
    x: x * c - y * s,
    y: x * s + y * c,
    z,
  };
}

function rotate_yz({x, y, z}, angle) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);

  return {
    x,
    y: y * c - z * s,
    z: y * s + z * c,
  };
}

let dz = 1;
let angle = 0;

function frame() {
    const dt = 1 / FPS;
    angle += Math.PI * dt;

    clear(ctx_1, canvas_1)

    for (const f of fs) {
        for (let i = 0; i < f.length; ++i) {
            const a = vs[f[i]];
            const b = vs[f[(i+1) % f.length]];
            line(ctx_1,
                 screen(canvas_1, project(translate_z(rotate_xz(a, angle), dz))),
                 screen(canvas_1, project(translate_z(rotate_xz(b, angle), dz))))
        }
    }

    clear(ctx_2, canvas_2)

    for (let i = -3.141; i < 3.141; i += (3.141 * 2) / 1000) {
        point(ctx_2,
            screen(canvas_2,
                project(
                    translate_z(
                        rotate_xy(
                            rotate_xz(
                                {
                                    x: Math.cos(i),
                                    y: Math.cos(i * 40) * Math.sin(i),
                                    z: Math.sin(i * 40) * Math.sin(i)
                                },
                                angle / 3
                            ),
                            angle / 3.5634
                        ), 3
                    )
                )
            )
        )
    }

    clear(ctx_3, canvas_3)

    for (let i = -3.141; i < 3.141; i += (3.141 * 2) / 500) {
        point(ctx_3,
            screen(canvas_3,
                project(
                    translate_z(
                        rotate_xy(
                            rotate_xz(
                                {
                                    x: Math.cos(i) * 0.2,
                                    y: Math.cos(i * 40) * Math.sin(i) * 0.2,
                                    z: Math.sin(i * 40) * Math.sin(i) * 0.2
                                },
                                3.14 / 3
                            ),
                            3.14 / 3
                        ),
                        1
                    )
                )
            )
        )

        point(ctx_3,
            screen(canvas_3,
                project(
                    translate_z(
                        rotate_xy(
                            rotate_xz(
                                translate_x(
                                    rotate_xy(
                                        rotate_xz(
                                            {
                                                x: Math.cos(i) * 0.05,
                                                y: Math.cos(i * 40) * Math.sin(i) * 0.05,
                                                z: Math.sin(i * 40) * Math.sin(i) * 0.05
                                            },
                                            3.14 / 3
                                        ),
                                        3.14 / 3
                                    ),
                                    0.7
                                ),
                                angle * 2
                            ),
                            0.567
                        ),
                        1
                    )
                )
            )
        )
    }

    clear(ctx_4, canvas_4)

    for (let i = 0; i < 10; i += 0.001) {
        point(ctx_4,
            screen(canvas_4,
                project(
                    translate_z(
                        rotate_xy(
                            { x: i / 10, y: 0, z: 0 },
                            angle + i
                        ),
                        dz
                    )
                )
            )
        )
    }

    setTimeout(frame, 1000 / FPS);
}

setTimeout(frame, 1000 / FPS);

// end canvas

