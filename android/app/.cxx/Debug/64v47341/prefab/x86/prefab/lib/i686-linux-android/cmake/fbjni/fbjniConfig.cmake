if(NOT TARGET fbjni::fbjni)
add_library(fbjni::fbjni SHARED IMPORTED)
set_target_properties(fbjni::fbjni PROPERTIES
    IMPORTED_LOCATION "/Users/apple/.gradle/caches/8.13/transforms/03cf7f5cf9e14e05baceaa87dceb5a35/transformed/fbjni-0.6.0/prefab/modules/fbjni/libs/android.x86/libfbjni.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/apple/.gradle/caches/8.13/transforms/03cf7f5cf9e14e05baceaa87dceb5a35/transformed/fbjni-0.6.0/prefab/modules/fbjni/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

