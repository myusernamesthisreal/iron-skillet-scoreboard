import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    styles: {
        global: {
            html: {
                overflow: "hidden",
            },
            body: {
                backgroundColor: "rgba(0,0,0,0)",
            }
        }
    },
    components: {
        Text: {
            variants: {
                score: {
                    fontSize: "48",
                    textColor: "white",
                    fontWeight: "500"
                }
            }
        },
    }
})

export default theme
