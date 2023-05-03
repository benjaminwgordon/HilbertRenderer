mod utils;

use hilbert_curve_generator::HilbertCurve;
use js_sys;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[macro_export]
macro_rules! log {
    ( $( $t:tt )* ) => {
        web_sys::console::log_1(&format!( $( $t )* ).into())
    }
}

#[wasm_bindgen]
pub fn hilbert_coordinates(n: u32, p: u32) -> js_sys::Uint32Array {
    let hilbert_curve = HilbertCurve::new(n, p).unwrap();
    let out = js_sys::Uint32Array::new_with_length((hilbert_curve.coordinates.len() * 3) as u32);

    for i in 0..hilbert_curve.coordinates.len() {
        let (x, y, z) = hilbert_curve.coordinates[i];
        out.set_index((i * 3) as u32, x);
        out.set_index((i * 3 + 1) as u32, y);
        out.set_index((i * 3 + 2) as u32, z);
    }

    out
}
