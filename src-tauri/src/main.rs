// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{utils::config::AppUrl, window::WindowBuilder, LogicalSize, Manager, Size, WindowUrl};

fn main() {
    let port = portpicker::pick_unused_port().expect("failed to find unused port");
    // let port = 80;

    let mut context = tauri::generate_context!();
    let url = format!("http://localhost:{}", port).parse().unwrap();
    let window_url = WindowUrl::External(url);
    // rewrite the config so the IPC is enabled on this URL
    context.config_mut().build.dist_dir = AppUrl::Url(window_url.clone());

    tauri::Builder::default()
        .plugin(tauri_plugin_window_state::Builder::default().build())
        .plugin(tauri_plugin_store::Builder::default().build())
        .plugin(tauri_plugin_localhost::Builder::new(port).build())
        .setup(move |app| {
            WindowBuilder::new(
                app,
                "Dashify".to_string(),
                if cfg!(dev) {
                    Default::default()
                } else {
                    window_url
                },
            )
            .title("Dashify")
            .build()?;
            let main_window = app.get_window("Dashify").unwrap();
            main_window
                .set_size(Size::Logical(LogicalSize {
                    width: 1370.0,
                    height: 900.0,
                }))
                .unwrap();
            Ok(())
        })
        .run(context)
        .expect("error while running tauri application");
}
