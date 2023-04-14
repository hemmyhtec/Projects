import 'package:flutter/material.dart';
import 'package:hexcolor/hexcolor.dart';
import 'package:rav_app/screens/splash_screen.dart';

void main() {
  runApp(const MaterialApp(
    home: WelcomePage(),
  ));
}

Color _primaryColor = HexColor('#040016');
Color _accentColor = HexColor('#12015b');

class WelcomePage extends StatelessWidget {
  const WelcomePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'RavApp',
      theme: ThemeData(
          primaryColor: _primaryColor,
          secondaryHeaderColor: _accentColor,
          scaffoldBackgroundColor: Colors.grey.shade100,
          primarySwatch: Colors.grey),
      home: const SplashScreen(title: 'RavApp'),
    );
  }
}
