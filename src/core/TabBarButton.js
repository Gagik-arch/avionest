import React from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Icon } from "./index";

const TabBarButton = ({
	icon,
	type,
	accessibilityRole,
	accessibilityState,
	accessibilityLabel,
	onPress,
	onLongPress,
	selected,
	theme = 'Dark'
}) => {

	return (
		<TouchableOpacity
			style={styles.container}
			accessibilityRole={accessibilityRole}
			accessibilityState={accessibilityState}
			accessibilityLabel={accessibilityLabel}
			onPress={(e) => {
				onPress(e)

			}}
			onLongPress={onLongPress}
		>
			<View style={{ ...styles.icon, ...styles['icon' + type], ...styles['icon' + theme] }}>
				<Icon
					type={icon}
					width={24}
					height={24}
					style={{ ...styles['feather' + type], ...(selected ? styles['featherSelected' + theme] : {}) }}
				/>
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	icon: {
		width: 44,
		height: 44,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 22
	},
	iconNormal: {},
	iconFilled: {
		backgroundColor: '#4743FF',
	},
	featherNormal: {
		fill: '#B1B5BD'
	},
	featherFilled: {
		fill: 'white'
	},
	featherSelectedDark: {
		fill: 'white'
	},
	featherSelectedLight: {
		fill: 'black'
	}
})

export default TabBarButton
