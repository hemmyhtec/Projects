import 'package:flutter/material.dart';
import 'package:hexcolor/hexcolor.dart';
import 'package:ravapp/pages/spalsh_screen.dart';

void main() {
  runApp(const MyApp());
}

Color _primaryColor = HexColor('#00a01e');
Color _accentColor = HexColor('#0f0f0f');

class MyApp extends StatefulWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
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
