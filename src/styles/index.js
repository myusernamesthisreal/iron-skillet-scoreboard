import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    components: {
        Text: {
            variants: {
                score: {
                    fontSize: "48",
                    textColor: "white",
                    fontWeight: "500"
                }
            }
        }
    }
})

export default theme
